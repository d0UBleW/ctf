package kotlinx.coroutines.flow;

import kotlin.Metadata;
import kotlin.coroutines.Continuation;
import kotlin.coroutines.jvm.internal.ContinuationImpl;
import kotlin.coroutines.jvm.internal.DebugMetadata;
import kotlin.jvm.functions.Function3;

@Metadata(mo15833k = 3, mo15834mv = {1, 6, 0}, mo15836xi = 176)
@DebugMetadata(mo16546c = "kotlinx.coroutines.flow.FlowKt__ReduceKt", mo16547f = "Reduce.kt", mo16548i = {0}, mo16549l = {44}, mo16550m = "fold", mo16551n = {"accumulator"}, mo16552s = {"L$0"})
/* compiled from: Reduce.kt */
final class FlowKt__ReduceKt$fold$1<T, R> extends ContinuationImpl {
    Object L$0;
    int label;
    /* synthetic */ Object result;

    FlowKt__ReduceKt$fold$1(Continuation<? super FlowKt__ReduceKt$fold$1> continuation) {
        super(continuation);
    }

    public final Object invokeSuspend(Object obj) {
        this.result = obj;
        this.label |= Integer.MIN_VALUE;
        return FlowKt__ReduceKt.fold((Flow) null, null, (Function3) null, this);
    }
}
