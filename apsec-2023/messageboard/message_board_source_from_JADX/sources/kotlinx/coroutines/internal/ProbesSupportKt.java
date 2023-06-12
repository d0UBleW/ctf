package kotlinx.coroutines.internal;

import kotlin.Metadata;
import kotlin.coroutines.Continuation;
import kotlin.coroutines.jvm.internal.DebugProbesKt;

@Metadata(mo15831d1 = {"\u0000\n\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0003\u001a#\u0010\u0000\u001a\b\u0012\u0004\u0012\u0002H\u00020\u0001\"\u0004\b\u0000\u0010\u00022\f\u0010\u0003\u001a\b\u0012\u0004\u0012\u0002H\u00020\u0001H\b¨\u0006\u0004"}, mo15832d2 = {"probeCoroutineCreated", "Lkotlin/coroutines/Continuation;", "T", "completion", "kotlinx-coroutines-core"}, mo15833k = 2, mo15834mv = {1, 6, 0}, mo15836xi = 48)
/* compiled from: ProbesSupport.kt */
public final class ProbesSupportKt {
    public static final <T> Continuation<T> probeCoroutineCreated(Continuation<? super T> continuation) {
        return DebugProbesKt.probeCoroutineCreated(continuation);
    }
}
