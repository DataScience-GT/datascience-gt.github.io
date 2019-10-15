import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../LoginPage';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<LoginPage />);
    });
});