const decode = require('hrm-image-decoder')
const fs = require('fs')

const imageToSvg = image =>
  pathsToSvg( decode( image ) )

const pathsToSvg = paths =>  
  `<svg width="100%" height="100%" viewBox="0 0 65536 21845" xmlns="http://www.w3.org/2000/svg">\n${
    paths.map( pathToSvg ).join( '\n' )
  }\n</svg>`

const pathToSvg = path =>
  `  <path fill="transparent" stroke="black" stroke-width="1920" stroke-linecap="round" stroke-linejoin="round" d="M ${
    path.map( pointToSvg ).join( ' L ' )
  } l 0 0" />`
  
const pointToSvg = p =>
  p[ 0 ] + ' ' + Math.floor( p[ 1 ] / 3 )

const com0 = `
eJwrZWBgSOY+pVsodLm5XWzuMSCXoYEnRSvB/rUeiK0vzNy30eKZ/S/HQCMQv1yzfNY1zYc9BTpfWrz1
LjcvNhRru2bG3NdjlTFRzVa6FKQm321R5TFP27JjYSYxID6jz2X3lnDV4FchRfk6IbkNILHS2PMyR5OF
okHsBakbm0C0UYVJjMJ+oej097w5EV9PZoLE9haXXdv/SfAyiP3pO2/Ozy8b9pV+m3EdxP9eKhQtU5Jx
FsS+VbJmcle12wSHehD+N6+pjmcFbxXPCv/Kk0tPV/2bB1IT2xA6s7rRbYJl07PqFx0zZue035n7vrV1
sUyj926QvHTfs+pTU8Ta3k9aM5l1euti1uk8K0Qmsu/81q+5CyQvNbsoP3TutsKORc+qk5fkNhxacrk5
e+GayYeW3Jl7f+nyJe/ms+8EqfNdmzHxz+ZzU0Ds5I03iq5v3d99favbhEMbi1Yf2nh9HUjc9sCiynv7
Bacf3PdzPYivfjKqI/G0Vt29M1p1O899afl8oaZz00XV/qCLaya7nFq0teDS0+0gdWqPGyvE7+itFL8z
ec3rB4u2Oj95uv3X88lrxF8uXxL54s5cxqddkxhGwSggAQAAS0PLkQ;
`

const svg = imageToSvg( com0 )

// console.log( svg )

const label = [];

label[0] = `
eJxTYmBg2OIXo+bgdU0xzSZTv9i8zaXZ0CiFSz+zm0v/x1QmI9HVn8w37Euz2Xv8ovPJC3u8z11mAIGk
EIXIglsNm+pOXlhff+0mSGhT3S2Vr6n9y3hjY+6B+E0Tzkr/mxijVjX5kdaDOYoRm9fq7dVff/AUSM5k
7UGh8AU7M35MFl3d0m9/koFIcKnFKZW3XSHFvTMlbX7Posp/PZeb5/dYtB/u2t89oXV/963GLy2xDVp1
8+vjyx/WmcTENjAHhTVbeL9v/epxs0/c61u/hbffZPcQt2lRPpWzo3z65z8M4F4I5C82iWFZkpLmuyBj
osH8yCMguxakrpW2yhCSL8n6r5abW2ysnRdv3ZV3N1E770sLX275LL7cLwe68swPPyqMPFJSXn10a3Pk
kdC5bmdAeu+dOZlpdvhk5pK9+rmrd9mWhWz/0lKx9dWyiq3sO79u+3LAZ9f+41EHz164dv79xcXXmU7d
vVl99Nod790C918tO3dfcPq5+w97gu5tbJp9K778wI2fxTvPvc4iNoxGwSggBQAAtyS7MQ;
`

label[1] = `
eJzTYWBgMPa/pRLg4i8b6nRJLtsqRafYvND0j3GbS7Ph7OA2gy2pbQYH8/4bMcypMF2ytcDC/uQbS+cz
Nx18LgU7X7rm7HnpGtAIBtGoWyoCMd8tmRL1Ei8V+VwCiZ0tuaWSlr0ksi6panpbvNKWaZHOZ0Diy5su
yc1vLTQV61SLrposue7zVL29H6advACSS58Vofxi5iMtiY4fU9Wa1+w2q712EyR+YEWIwt6VEHNHwSgY
BdQDAC40R+0;
`

label[2] = `
eJwTYWBgcPa8p+7glal/0NP5jEHA0bMpOQdPAYUZzhdHKJ8qfaSl1rxh3/xW9/PzW89dbu9L7UiZ/d3y
7txripHzT0qA1Jmv8ZbavYpjkeXqo2cZRsEoGAVDCgAArVkitA;
`

label[3] = `
eJxTZmBgSLOJUUu21Ut8YiO5LsHu6FmgEEOy7SOtWPvPZqFOTY4XnVmcHbzaXAwCGBy0g75bLgl5rrsk
5JGWQthnsznhldZC0QwOLQlNjmWpn81yMm+pgPQ7Vj7Ssq5mcbasiahfX+9zCSS2vzJBc29Vpr52I4uz
REebi0A3izNHX53dv4m5Rp+n+ssykAhup8+YnZsgvfF21P7jx8KMr+QF/70FEm8J3zUnIqZo9atEsUOi
WXdulmQ53gWJv6w2UdjT8EH2YbeQ/MPuNu2ULi2nw13MQSC5nKoD/pZN8/xy2h8GgPj+ldsKP1R8afGv
XPYAxOetOpmZ086bs6xTPzelqyhfqfvsBdauEw9Bcs8XCclfmrjYFsQ+tGSj27c5QtGNM/4lfetvrACJ
8UzRcuJeeKRq6eL+RhDfbfHl5qJ5jgt3z+rbmz3F+ApEjduE/vlfDrAsWX3+/lKInXM3L7ZlOn3UDsSe
ethd4sthiD82bzeJCdkuvfH61tXn/2yGiJleOC9jerdCqfZZmCKEf8C/50GUj9yzKJ/IF/P8QGKCl6YU
FFzKmLjpYuvioIvvL065ALHH+wpvTt1N3hyb59Kls583VtQ+e9gj90z+zuznyx6YvDrxcOW7ZQ8efwi5
6vSx8xxIvfyZ91PfXO6axPnIbULP23NTQGIup45s+32WfeeO25q7njzW3LXjxdPt6e/Zd5Iap6OA/gAA
HL/u9w;
`

label[4] = `
eJzjZ2Bg2OLX5mIQMD1AKPrkBSCXITPrZAmI3lr7x0avod+Lrf/o2X8TJde9mHmp6va8NfGBi1ic/Re/
N2agM9jTcLk5tkEhZU9DaKxlU1fYhFb3kJt97iFrJ5vEPJ/qlHp4+qLKw9OZ+zqmJi96P8lm07+eucdS
ut5fXNa56wZrV+v9+T3+z272bX1pOOn6K7/Jk1/Q2/2jYBQMRgAAtHtFDA;
`

label[5] = `
eJxTZmBg0A10PqMRrLVrYvTzzg/pPJ4f0j+b5WW8N76bNz/MsfLPDOvq+Zt2VZsf3lobcBWonCFy/s6M
+LnOBc9mnSypmhxQ2d4XUNnffbRwTtv8MOl2DjeJjj82UzrfG/f0pOiw9T/SqpqcovNi5nvjx7MrrWPm
SQbFzFOMuLwwtePywvf9Fxb9meGzRGuX+7JzlxlGwSgYBXQHADjoQ6A;
`

label[6] = `
eJyTYGBgOOjZ5Q6kGJw9Y5oYwHy17SD6l8mSrSD6fm6TI4hOzL1WC6K1GwMqQfSqxjo7EB2y8LsliA5f
cKkKRCtu8S4D0SqbP5uB6AVFjTa5uV891ucc8OfLDY19mdeWrlLImyNaHpD3svpk5vx6hZTvTQopxS0p
aQ+7bcss+h/2hE74Ny90gs0mi/7cPQ49+48/rFt9vqs646xRReQRy9Kf6/cWM/fJlHxp+V5qW+ZfeTIz
p2p5xvKa8rjU2jXhqbU1vh41G938K5/Z3yo5CnbjKBgFowA7AACS/1aW;
`

label[7] = `
eJwTYWBgaDDqcgdSDExGITUgutlQaQuI3iy/ZCuIXhkEkRforrQG0cJd7sUg2rESQrsvg4hP3fHdEkSz
J8dbH01O0XJMVdT4kaGowZebosVbtUIHJBfbe15mWecKnerGrx4Mo2AUjIIBBwB8NB4c;
`

label[8] = `
eJwTY2BgsPDt9wJSDDt9IuoZwPzpa0D0I9vJK0F0SVqXO4QOqATRp0rPlUNoFmcQzdfzxwZE9/S4F4Po
B3MO5oHofz3GM272dZ5jGAWjYBQMWgAAWecaLg;
`

label[9] = `
eJwzZWBgOOKRoHnEo83Fw31NvIf7+/79XoIrtvgpbdENXLFDOXTDPqkIowOdcRv2MSSt2f0pbf6mtOw/
Mx7lvO55lBNS8zTbKOVVpmzoh/TpAWWpov41ydMDWhJkQ1kTFCPa4rXiWBMO5jElniuvSb7X/CMlteNV
5vt+oJUMW2tnB2s3ivp39fJ4Vk2WDPo2ZUlk+RTvst+TQmr6u+81S3QktP6bmNn9bcr7/vzpDHPyp7ct
+DZFcl1734Z9wl07j6yv33t8f6X5YecKrV37K7V2LW32uTSnLfXJnLbCtwyjYBSMAqIBAKVAZhk;
`

label[10] = `
eJzzY2Bg2O472Xenj2yos+ea+DOuG5Ke2BilZFvpJb63UIwoNu/3Kjavs/tiVmn9yfyeeoa1u3iazVHR
CEdnEQ/3kxI7fRI0Tf1eGxgE8HiuD9CKWx9wtNDY/1aDtc/zzjOuP6a+t+hflmc5fU2Eo/1JV4+Yew5e
mc9tvcs+AK1l6It5pMUbe02xLd5dvC7Jiq8s1YovMfeoaFjhWenzxdcUj5aXWhwtV4xwK18TH1x0rvxR
TmpHZUrhxL6Yqult8QxzXmXO33Q3b+eR88WPH4HMS5l9TTFnhrdU0TRvqaYJl+T6u++pC3el6Mxqr7SW
bm9zkW6fHSzRoRY9pXNNPEffltSiaWbpWTONUhgmWmdN6nIvlui4VCXdHtMk3Z7ZLdFROFGgu24Ww0SW
+Q/mtC24O5djUfxcwRV35zqfCVz0+gXDKBgFwwQAAK8ShNQ;
`

label[11] = `
eJxzYGBgWB+gGHHc/Vx5sPOthpsOtxqe2ITUfDFzLvhjbJTSYCTq/8f4j81309cG2Vb31K87xqg5ez7S
Wh9QZ6cRfLRQNzCh1drnz4wzrv3L7tjP3/TcesnWXyYb9l13DLkR4HLv/nH3z++AVjA0Jr43Lkt9rvsi
K0EzLi9B06/ktcGhiu+WdlUszttrFCO21xwt3FV9q8Gu6nXPoYrSKWdLWOan5MhuzMyav+lrqtauv0la
u36krNkdWBxyw60895VzxfvXIHMvLHquG77gkdazWc9186e/N/49icWZeYJkUE+Pc0FPz+uert7SKWz9
f2bUTGKZnzWTd6n/Yt6lJ5ZuOXhgRciNHasznzOMglEwwgEAbaB9xw;
`

label[12] = `
eJxjZ2Bg2F5TaGpZUzfLutr6GJDLwN17S2VSV64RAxI46Sboc9Azt8/U73mnasjjtilRj9u44jK7O+NY
5vPGCq6QitDatcXP/DBv7JrdP1LW7E7M3bAPpM+vhMPNrbxq+v5K3qXbayTXGdYrbVnVqLZ9abPa9jlt
8zeJdYqu5uhLaGXr35nB0Sfq394nGcTRl9rBPKFtQc2k2et/TFba8mHaih23563YEbJQbfuJpbxL7Ve+
7tm96lrtjtV7s3eslgyyWVVoemJphPLduWelc2aclPg2xV2cYeJJCZD9VYd2ZtQefG2w7fZrAxA/9EKh
aeiF+WEXL0bUX7xYNf3yhaa5t8/yLn1zXHJd037R1a37Jq/s2Nu1mHNv01zOvbca2PadLGHZ71zAeMA+
99vhvdnr7tnnrr6/N3vyC+usCS+3pE54WWjKMApGwRAGAMOUkvo;
`

label[13] = `
eJzjZWBgeJVZaFqYntpRmD57/ae0+ZsK0yNuA4UZcjLfGy9t/mwGYpdMjVH7NiVFp6Wfw42BSqC97979
x7Nj7oHYiXM+T4qfu2Rr/Nx790F8vp75mz5PXbI1a6bSFhBffz2Pp8rmLvePR3k8QfxFm2cHq2wOqQGx
m/aL+rPsj6gHsU3WxjQt2pzQ+uZ4QiuIf+18k2PQRQjb/5Je4s5beokgdtWhprkPTzfNvXa+bcHlC7xL
Qy8s2QoS/3PQ/PDjUxv2RZ3bsA/E/3bY/mTVoZMXqg7du//t8ONHt88+fnTxYuJDrysQd4+CUTDUAQCB
3Gxz;
`

label[14] = `
eJyTYGBgEIqOUeuJ5XDri/G5BOQymNWGKPxI2ZDEmuBddryMY9HWWqUtmk3mh0Fyt+cdFX08+7sld++G
fVWTtxxU32R+eNHmnUfsV54rvzG/0vrBHHdxkLqm/faCgrveGzOMglEwCgY1AACUKSZ0;
`

label[18] = `
eJwTYWBguBLrpPkjw0nToSfQCMhlKI3tb/xeurHpYXdNp2UT+87qxkv7QeKfAuceE4ude0ym0e3Mzdkh
V0Fi/pVTTLaVlcepFD7sWZ8DUTcKRsEoGDoAADKRIMw;
`

label[21] = `
eJwTYGBg2O7/1eNTIIfjvkheA9moG2bpYYKXgcIML6unmDgWXW7+kdG3d0ZT396c9kv7QeLKdVEdynXV
R1NrW+8zjIJRMAqGNAAALsIZzQ;
`

label[22] = `
eJzzZmBgsFVP0Yo0bdPuDgk0YjLSW2mq9eCEqXnnOY6wsmvbY/7eAiphYDIqyi83sy2L8N/fDeI7pvIa
fG/6ZQ5iW2VMMfmRMWP2zIyya3y5u278L9p1I6f9/UWQXEDOl5bOjkWVIPaESTfM3k96GDBhEkTu0sRt
pjdWTDFx3XDD7PrWRpuv257Zb95+2X3z9jXhX7fdTby+tS3dbnNAXsgq27LQuVp1jTO860H6pFb8LFbc
tGHf120Qt+1/etRu0ZNGm7s34617Lz+zD7qY5/L7bJTP4lPnIjJPFOVnnuhvlD+zaKvt2b69by6fvSB/
s+za6wdl1ya/Yjql+zbyyLH3mrvufP43L+JrTef2r/q5P7/MjN//ycK75YOWU/r7o3afXtlazX5ua8Uw
CkbBMAQAjBOTMA;
`

label[23] = `
eJyTZGBgmOySKVnm3Fjxy/HfvNmOyffEnZc90Ak58fB2lN7TvcV6T2UaC58DlTHouovzbQh6JBIR4y5h
2Hpe5n3rTOWw5oC8PQ3yd0DygUFfWo6FCU4vjWXfuSBVtX9BkVOqf+VXD4ZRMApGwaAFAO6EKM0;
`

label[24] = `
eJyTYGBgmOV3QNja77zMdv814WIBXZO2+++68SlwxvVHKcse7Gnwf+Y2Teqt5tSn209N+SAbOiFTkrVL
TXxyoLsEUCvD7ajFto5FHLXr2qQ3gvin222tJlbMjG8u/FnMl/BzPcMoGAWjYFADAEA+KQU;
`

for (i = 0; i < label.length; i++) {
    if (i > 14 && i < 18) {
        continue
    }
    if (i > 18 && i < 21) {
        continue
    }
    data = imageToSvg(label[i])
    fname = "label-"+i+".svg";
    fs.writeFile(fname, data, (err) => {
        if (err) throw err
    })
}