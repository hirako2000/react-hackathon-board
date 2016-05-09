import {
  HACKS,
  hacks,
  listFromServer,
  default as hacksReducer
} from 'redux/modules/hacks'

describe('(Redux Module) Hacks', function () {
  it('Should export a constant HACKS.', function () {
    expect(HACKS).to.equal('HACKS')
  });

  describe('(Reducer)', function () {
    it('Should be a function.', function () {
      expect(hacksReducer).to.be.a('function')
    });

    it('Should initialize with a an empty array.', function () {
      expect(hacksReducer(undefined, {}).length).to.equal(0)
    });

    it('Should return the return the payload as state.', function () {
      let someHackList = [1, 2, 3];
      let state = hacksReducer(state, hacks(someHackList));
      expect(state).to.equal(someHackList);
    });

    it('Should return the previous state if an action was not matched.', function () {
      let state = hacksReducer(state, {type: '@@@@@@@'});
      expect(state.length).to.equal(0);

      let firstHackList = [1, 2, 3];
      state = hacksReducer(state, hacks(firstHackList));
      expect(state).to.equal(firstHackList);

      state = hacksReducer(state, {type: '@@@@@@@'});
      expect(state).to.equal(firstHackList);
    })


  })

});
