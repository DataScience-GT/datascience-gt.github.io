import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../Navigation';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<Navigation />);
    });
});