from Crypto.Util.number import *
from secret import flag
import random

key_1 = int(''.join(str(random.randint(0, 9)) for _ in range(128)))
key_2 = int(''.join(str(random.randint(0, 9)) for _ in range(128)))
key_xor = key_1 ^ key_2

cipher = bytes_to_long(flag) ^ key_2
print([cipher, key_1, key_xor])

# [15215040598997461007092629735030130564793251259348515746270834331742844769751614343514930207378383281309186099267228538055916093, 13456334108770740750692568249680854723832724977819193179477419628822735191628871284949818224467875906096192126301642916605706678, 3794185637437606669925727854288645910802920551984636122084448092364050341760913036052727965235871016479195498419738316692321782]