import {Constraint} from '../constraint/constraint';
import {ListConstraint, ListItem} from '../constraint/list';
import {ConstraintUtil} from '../constraint/util';

export function findListItems<T>(
	constraint: Constraint<T> | undefined,
): ListItem<T>[] | null {
	const c = constraint
		? ConstraintUtil.findConstraint<ListConstraint<T>>(
				constraint,
				ListConstraint,
		  )
		: null;
	if (!c) {
		return null;
	}

	return c.options;
}
