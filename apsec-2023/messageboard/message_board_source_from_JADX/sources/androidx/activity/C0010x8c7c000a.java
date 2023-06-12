package androidx.activity;

import android.view.View;
import android.view.ViewParent;
import kotlin.Metadata;
import kotlin.jvm.functions.Function1;
import kotlin.jvm.internal.Intrinsics;
import kotlin.jvm.internal.Lambda;

@Metadata(mo15831d1 = {"\u0000\n\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\u0010\u0000\u001a\u0004\u0018\u00010\u00012\u0006\u0010\u0002\u001a\u00020\u0001H\n¢\u0006\u0002\b\u0003"}, mo15832d2 = {"<anonymous>", "Landroid/view/View;", "it", "invoke"}, mo15833k = 3, mo15834mv = {1, 7, 1}, mo15836xi = 48)
/* renamed from: androidx.activity.ViewTreeOnBackPressedDispatcherOwner$findViewTreeOnBackPressedDispatcherOwner$1 */
/* compiled from: ViewTreeOnBackPressedDispatcherOwner.kt */
final class C0010x8c7c000a extends Lambda implements Function1<View, View> {
    public static final C0010x8c7c000a INSTANCE = new C0010x8c7c000a();

    C0010x8c7c000a() {
        super(1);
    }

    public final View invoke(View view) {
        Intrinsics.checkNotNullParameter(view, "it");
        ViewParent parent = view.getParent();
        if (parent instanceof View) {
            return (View) parent;
        }
        return null;
    }
}
