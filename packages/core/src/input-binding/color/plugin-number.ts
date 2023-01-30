import {Formatter} from '../../common/converter/formatter';
import {InputBindingPlugin} from '../plugin';
import {ColorController} from './controller/color';
import {
	colorFromRgbaNumber,
	colorFromRgbNumber,
} from './converter/color-number';
import {
	colorToHexRgbaString,
	colorToHexRgbString,
	createColorStringParser,
} from './converter/color-string';
import {createColorNumberWriter} from './converter/writer';
import {equalsColor} from './model/color';
import {IntColor} from './model/int-color';
import {ColorInputParams, parseColorInputParams} from './util';

function shouldSupportAlpha(inputParams: ColorInputParams): boolean {
	if (inputParams?.color?.alpha) {
		return true;
	}
	return false;
}

function createFormatter(supportsAlpha: boolean): Formatter<IntColor> {
	return supportsAlpha
		? (v: IntColor) => colorToHexRgbaString(v, '0x')
		: (v: IntColor) => colorToHexRgbString(v, '0x');
}

function isForColor(params: Record<string, unknown>): boolean {
	if ('color' in params) {
		return true;
	}
	if ('view' in params && params.view === 'color') {
		return true;
	}
	return false;
}

/**
 * @hidden
 */
export const NumberColorInputPlugin: InputBindingPlugin<
	IntColor,
	number,
	ColorInputParams
> = {
	id: 'input-color-number',
	type: 'input',
	accept: (value, params) => {
		if (typeof value !== 'number') {
			return null;
		}
		if (!isForColor(params)) {
			return null;
		}

		const result = parseColorInputParams(params);
		return result
			? {
					initialValue: value,
					params: result,
			  }
			: null;
	},
	binding: {
		reader: (args) => {
			return shouldSupportAlpha(args.params)
				? colorFromRgbaNumber
				: colorFromRgbNumber;
		},
		equals: equalsColor,
		writer: (args) => {
			return createColorNumberWriter(shouldSupportAlpha(args.params));
		},
	},
	controller: (args) => {
		const supportsAlpha = shouldSupportAlpha(args.params);
		const expanded =
			'expanded' in args.params ? args.params.expanded : undefined;
		const picker = 'picker' in args.params ? args.params.picker : undefined;
		return new ColorController(args.document, {
			colorType: 'int',
			expanded: expanded ?? false,
			formatter: createFormatter(supportsAlpha),
			parser: createColorStringParser('int'),
			pickerLayout: picker ?? 'popup',
			supportsAlpha: supportsAlpha,
			value: args.value,
			viewProps: args.viewProps,
		});
	},
};
