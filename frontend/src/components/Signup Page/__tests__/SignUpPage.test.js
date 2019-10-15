import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from '../SignUpPage';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<SignUpPage />);
    });
});