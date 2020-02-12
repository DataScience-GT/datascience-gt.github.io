import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '..';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<Dashboard />);
    });
});
