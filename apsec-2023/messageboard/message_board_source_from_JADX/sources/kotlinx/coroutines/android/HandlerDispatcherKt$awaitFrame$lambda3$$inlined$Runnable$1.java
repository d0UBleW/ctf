package kotlinx.coroutines.android;

import kotlin.Metadata;
import kotlinx.coroutines.CancellableContinuation;

@Metadata(mo15831d1 = {"\u0000\n\n\u0000\n\u0002\u0010\u0002\n\u0002\b\u0002\u0010\u0000\u001a\u00020\u0001H\n¢\u0006\u0002\b\u0002¨\u0006\u0003"}, mo15832d2 = {"<anonymous>", "", "run", "kotlinx/coroutines/RunnableKt$Runnable$1"}, mo15833k = 3, mo15834mv = {1, 6, 0}, mo15836xi = 48)
/* renamed from: kotlinx.coroutines.android.HandlerDispatcherKt$awaitFrame$lambda-3$$inlined$Runnable$1  reason: invalid class name */
/* compiled from: Runnable.kt */
public final class HandlerDispatcherKt$awaitFrame$lambda3$$inlined$Runnable$1 implements Runnable {
    final /* synthetic */ CancellableContinuation $cont$inlined;

    public HandlerDispatcherKt$awaitFrame$lambda3$$inlined$Runnable$1(CancellableContinuation cancellableContinuation) {
        this.$cont$inlined = cancellableContinuation;
    }

    public final void run() {
        HandlerDispatcherKt.updateChoreographerAndPostFrameCallback(this.$cont$inlined);
    }
}
