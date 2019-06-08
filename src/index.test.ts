import { LookupArray } from './index';
describe('lookup array', function() {
  let lookupArray: LookupArray<any>;
  beforeEach(function() {
    lookupArray = new LookupArray([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
  test('should be created', function() {
    expect(lookupArray).toBeTruthy();
  });
  test('should accept partial options', function() {
    const lookupArray = new LookupArray([{ uid: '1' }, { uid: '2' }], {
      id: 'uid'
    });
    expect(lookupArray).toBeTruthy();
  });
  test('should be able to get a value by id', function() {
    const secondVal = lookupArray.getById(2);
    expect(secondVal).toEqual({ id: 2 });
  });
  test('should be able to update one value', function() {
    const secondVal = lookupArray.getById(2);
    secondVal['value'] = '100';
    const updatedVal = lookupArray.getById(2);

    expect(updatedVal).toEqual({ id: 2, value: '100' });
  });
  test('should be able to map over elements', function() {
    // TODO add this test
    expect(false).toBeTruthy();
  });
});
