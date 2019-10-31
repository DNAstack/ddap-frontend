import _get from 'lodash.get';
import { Observable } from 'rxjs';
import { concat } from 'rxjs/internal/observable/concat';
import { debounceTime, map, switchMap } from 'rxjs/operators';

// Flattens an array of arrays: [1, [a, b], [c], d] = [1, a, b, c, d]
export const flatten = (arrays: Array<string>) => [].concat.apply([], arrays);

// A wrapper for the _get function.
export const pick = (fieldName, fallback?) => (entity) => _get(entity, fieldName, fallback);

// Picks particular fields from a collection (collection = array of objects).
export const pluck = (fieldName, fallback) => (array) => array.map(pick(fieldName, fallback));

// A wrapper for a filter function.
export const filterBy = (filterFn) => (array) => array.filter(filterFn);

// To be used in filter function. Assumes there is no other item with the same value to the left of the inspected item.
export const isMostLeft = (value, index, self) => self.indexOf(value) === index;

export const includes = (substr) => (value) => value.includes(substr);

// Filters out repetitions from an array.
export const makeDistinct = filterBy(isMostLeft);

/**
 * Used to stitch together autocomplete suggestions source and autocomplete input field to filter results relevant
 * to user input.
 *
 * @method filterSource
 * @param {Observable<string[]>} [autocompleteSource$] Array of all suggestions.
 * @param {Observable<string>} [formInputValue$] String used to filter suggestions.
 * @return {Observable<string[]>} All suggestions including the formInputValue$ string.
 *
 * ### Example
 * ```javascript *
 * const claimDefinitions$: Observable<string[]> = this.suggestionService.get()
 * this.suggestions$ = filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);
 * ```
 *
 */
export function filterSource(autocompleteSource$: Observable<string[]>,
                             formInputValue$: Observable<string>): Observable<string[]> {

  const filteredSource$ = (autocompleteInputValue) => autocompleteSource$.pipe(
    map(filterBy(includes(autocompleteInputValue)))
  );

  // Concat is used to return all suggestions on the first click.
  return concat(autocompleteSource$, formInputValue$.pipe(
    debounceTime(300),
    switchMap(filteredSource$)
  ));
}

