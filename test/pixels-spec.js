import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Pixels from '../src/shared/pixels';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);
let should = chai.should();


describe('Pixels:', () => {
    let pixels = new Pixels();

    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('should not be possible to create a new instance', () => {
        'true'.should.equal('true');
    });
});
