import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '..';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<HomePage />);
    });
});
