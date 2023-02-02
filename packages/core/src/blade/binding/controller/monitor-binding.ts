import {MonitorBindingValue} from '../../../common/binding/value/monitor-binding';
import {ValueController} from '../../../common/controller/value';
import {TpBuffer} from '../../../common/model/buffered-value';
import {View} from '../../../common/view/view';
import {LabeledValueController} from '../../label/controller/value-label';

export type BufferedValueController<
	T,
	Vw extends View = View,
> = ValueController<TpBuffer<T>, Vw>;

export type MonitorBindingController<T> = LabeledValueController<
	TpBuffer<T>,
	BufferedValueController<T>,
	MonitorBindingValue<T>
>;

export function isMonitorBindingController<T>(
	c: unknown,
): c is MonitorBindingController<T> {
	if (!(c instanceof LabeledValueController)) {
		return false;
	}
	if (!(c.value instanceof MonitorBindingValue)) {
		return false;
	}
	return true;
}
