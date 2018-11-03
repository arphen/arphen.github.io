/**
 * source - http://passwordmaker.org/scripts/hashutils.js
 */

/**
  PasswordMaker - Creates and manages passwords
  Copyright (C) 2005 Eric H. Jung and LeahScape, Inc.
  http://passwordmaker.org/
  grimholtz@yahoo.com

  This library is free software; you can redistribute it and/or modify it
  under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation; either version 2.1 of the License, or (at
  your option) any later version.

  This library is distributed in the hope that it will be useful, but WITHOUT
  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  FITNESSFOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License
  for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with this library; if not, write to the Free Software Foundation,
  Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
**/

/*
 * Common functions used by md4, md5, ripemd5, sha1, and sha256.
 * Version 2.1 Copyright (C) Jerrad Pierce, Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 *
 * Modified by Eric H. Jung (grimholtz@yahoo.com)
 */

if (typeof (PasswordMaker_HashUtils) !== 'object') {
  var PasswordMaker_HashUtils = {

    chrsz: 8,
    /* bits per input character. 8 - ASCII; 16 - Unicode      */

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    str2rstr_utf8: function (input) {
      var output = '';
      var i = -1;
      var x, y;

      while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (x >= 0xD800 && x <= 0xDBFF && y >= 0xDC00 && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F) {
          output += String.fromCharCode(x);
        } else if (x <= 0x7FF) {
          output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
            0x80 | (x & 0x3F));
        } else if (x <= 0xFFFF) {
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
            0x80 | ((x >>> 6) & 0x3F),
            0x80 | (x & 0x3F));
        } else if (x <= 0x1FFFFF) {
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
            0x80 | ((x >>> 12) & 0x3F),
            0x80 | ((x >>> 6) & 0x3F),
            0x80 | (x & 0x3F));
        }
      }
      return output;
    },

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    rstr2binl: function (input) {
      var output = Array(input.length >> 2);
      for (var i = 0; i < output.length; i++) {
        output[i] = 0;
      }
      for (i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
      }
      return output;
    },

    /*
     * Convert an array of little-endian words to a string
     */
    binl2rstr: function (input) {
      var output = '';
      for (var i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
      }
      return output;
    },

    /*
     * Convert a raw string to an arbitrary string encoding
     */
    rstr2any: function (input, encoding) {
      var divisor = encoding.length;
      var remainders = Array();
      var i, q, x, quotient;

      /* Convert to an array of 16-bit big-endian values, forming the dividend */
      var dividend = Array(input.length / 2);
      var inp = new String(input); // EHJ: added
      for (i = 0; i < dividend.length; i++) {
        dividend[i] = (inp.charCodeAt(i * 2) << 8) | inp.charCodeAt(i * 2 + 1);
      }

      /*
       * Repeatedly perform a long division. The binary array forms the dividend,
       * the length of the encoding is the divisor. Once computed, the quotient
       * forms the dividend for the next step. We stop when the dividend is zero.
       * All remainders are stored for later use.
       */
      while (dividend.length > 0) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
          x = (x << 16) + dividend[i];
          q = Math.floor(x / divisor);
          x -= q * divisor;
          if (quotient.length > 0 || q > 0) {
            quotient[quotient.length] = q;
          }
        }
        remainders[remainders.length] = x;
        dividend = quotient;
      }

      /* Convert the remainders to the output string */
      var output = '';
      for (i = remainders.length - 1; i >= 0; i--) {
        output += encoding.charAt(remainders[i]);
      }

      return output;
    },

    /// ===== big endian =====\\\

    /*
     * Convert a raw string to an array of big-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    rstr2binb: function (input) {
      var output = Array(input.length >> 2);
      for (var i = 0; i < output.length; i++) {
        output[i] = 0;
      }
      for (i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
      }
      return output;
    },

    /*
     * Convert an array of big-endian words to a string
     */
    binb2rstr: function (input) {
      var output = '';
      for (var i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
      }
      return output;
    },

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    bit_rol: function (num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    },

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    safe_add: function (x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }
  };
}

// scripts/sha256.js

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS PUB XXXXXX
 * Version 2.2-alpha Copyright Angel Marin, Paul Johnston 2000 - 2005.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 *
 * modified by Eric H. Jung (grimholtz@yahoo.com) - 2005
 *
 */

if (typeof (PasswordMaker_SHA256) !== 'object') {
  var PasswordMaker_SHA256 = {
    any_sha256: function (s, e) {
      return PasswordMaker_HashUtils.rstr2any(this.rstr_sha256(PasswordMaker_HashUtils.str2rstr_utf8(s)), e);
    },
    any_hmac_sha256: function (k, d, e, b) {
      return PasswordMaker_HashUtils.rstr2any(this.rstr_hmac_sha256(PasswordMaker_HashUtils.str2rstr_utf8(k),
        PasswordMaker_HashUtils.str2rstr_utf8(d), b), e);
    },

    /*
     * Calculate the sha256 of a raw string
     */
    rstr_sha256: function (s) {
      return PasswordMaker_HashUtils.binb2rstr(this.binb_sha256(PasswordMaker_HashUtils.rstr2binb(s), s.length *
        8));
    },

    /*
     * Calculate the HMAC-sha256 of a key and some data (raw strings)
     */
    rstr_hmac_sha256: function (key, data, bug) {
      var bkey = PasswordMaker_HashUtils.rstr2binb(key);
      if (bkey.length > 16) bkey = this.binb_sha256(bkey, key.length * 8);

      var ipad = Array(16),
        opad = Array(16);
      for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = this.binb_sha256(ipad.concat(PasswordMaker_HashUtils.rstr2binb(data)), 512 + data.length * 8);
      return PasswordMaker_HashUtils.binb2rstr(this.binb_sha256(opad.concat(hash), 512 + ((bug) ? 160 : 256)));
    },

    /*
     * Main sha256 function, with its support functions
     */
    S: function (X, n) {
      return (X >>> n) | (X << (32 - n));
    },
    R: function (X, n) {
      return (X >>> n);
    },
    Ch: function (x, y, z) {
      return ((x & y) ^ ((~x) & z));
    },
    Maj: function (x, y, z) {
      return ((x & y) ^ (x & z) ^ (y & z));
    },
    Sigma0256: function (x) {
      return (this.S(x, 2) ^ this.S(x, 13) ^ this.S(x, 22));
    },
    Sigma1256: function (x) {
      return (this.S(x, 6) ^ this.S(x, 11) ^ this.S(x, 25));
    },
    Gamma0256: function (x) {
      return (this.S(x, 7) ^ this.S(x, 18) ^ this.R(x, 3));
    },
    Gamma1256: function (x) {
      return (this.S(x, 17) ^ this.S(x, 19) ^ this.R(x, 10));
    },
    Sigma0512: function (x) {
      return (this.S(x, 28) ^ this.S(x, 34) ^ this.S(x, 39));
    },
    Sigma1512: function (x) {
      return (this.S(x, 14) ^ this.S(x, 18) ^ this.S(x, 41));
    },
    Gamma0512: function (x) {
      return (this.S(x, 1) ^ this.S(x, 8) ^ this.R(x, 7));
    },
    Gamma1512: function (x) {
      return (this.S(x, 19) ^ this.S(x, 61) ^ this.R(x, 6));
    },

    sha256_K: new Array(
      1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
      1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
      264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
      113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
      1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
      1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998
    ),

    binb_sha256: function (m, l) {
      var HASH = new Array(1779033703, -1150833019, 1013904242, -1521486534,
        1359893119, -1694144372, 528734635, 1541459225);
      var W = new Array(64);
      var a, b, c, d, e, f, g, h;
      var i, j, T1, T2;

      /* append padding */
      m[l >> 5] |= 0x80 << (24 - l % 32);
      m[((l + 64 >> 9) << 4) + 15] = l;

      for (i = 0; i < m.length; i += 16) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];

        for (j = 0; j < 64; j++) {
          if (j < 16) W[j] = m[j + i];
          else {
            W[j] = PasswordMaker_HashUtils.safe_add(PasswordMaker_HashUtils.safe_add(PasswordMaker_HashUtils
              .safe_add(this.Gamma1256(W[j - 2]), W[j - 7]),
              this.Gamma0256(W[j - 15])), W[j - 16]);
          }

          T1 = PasswordMaker_HashUtils.safe_add(PasswordMaker_HashUtils.safe_add(PasswordMaker_HashUtils.safe_add(
              PasswordMaker_HashUtils.safe_add(h, this.Sigma1256(e)), this.Ch(e, f, g)),
            this.sha256_K[j]), W[j]);
          T2 = PasswordMaker_HashUtils.safe_add(this.Sigma0256(a), this.Maj(a, b, c));
          h = g;
          g = f;
          f = e;
          e = PasswordMaker_HashUtils.safe_add(d, T1);
          d = c;
          c = b;
          b = a;
          a = PasswordMaker_HashUtils.safe_add(T1, T2);
        }

        HASH[0] = PasswordMaker_HashUtils.safe_add(a, HASH[0]);
        HASH[1] = PasswordMaker_HashUtils.safe_add(b, HASH[1]);
        HASH[2] = PasswordMaker_HashUtils.safe_add(c, HASH[2]);
        HASH[3] = PasswordMaker_HashUtils.safe_add(d, HASH[3]);
        HASH[4] = PasswordMaker_HashUtils.safe_add(e, HASH[4]);
        HASH[5] = PasswordMaker_HashUtils.safe_add(f, HASH[5]);
        HASH[6] = PasswordMaker_HashUtils.safe_add(g, HASH[6]);
        HASH[7] = PasswordMaker_HashUtils.safe_add(h, HASH[7]);
      }
      return HASH;
    }
  };
}

// (Ex) var pass = nilnehpra_generatePassword("Pro*", "udn.com");
var MASTER_PWD = '';

function nilnehpra_generatePassword(profile, theKey) {
  var passwdLength, selectedChar;

  switch (profile) {
  case 'Lite':
    passwdLength = 10;
    selectedChar = '0123456789abcdef';
    break;
  case 'Pro*':
    passwdLength = 12;
    selectedChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    break;
  case 'Pro**':
    passwdLength = 12;
    // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()_-+={}|[]\:";'<>?,./
    selectedChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()_-+={}|[]\\:\"\;'<>?,./";
    break;
  default:
    break;
  }

  // Calls generatepassword() n times in order to support passwords
  // of arbitrary length regardless of character set length.
  var password = '';
  var count = 0;
  while (password.length < passwdLength) {
    // To maintain backwards compatibility with all previous versions of passwordmaker,
    // the first call to _generatepassword() must use the plain "key".
    // Subsequent calls add a number to the end of the key so each iteration
    // doesn't generate the same hash value.
    password += (count === 0) ?
      PasswordMaker_SHA256.any_sha256(MASTER_PWD + theKey, selectedChar) :
      PasswordMaker_SHA256.any_sha256(MASTER_PWD + '\n' + count + theKey, selectedChar);

    count++;
  }

  var result = password.substring(0, passwdLength);
  return result;
}
