import React from 'react';
import { shallow } from 'enzyme';
import DashboardGroupPage from '../DashboardGroupPage';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<DashboardGroupPage />);
    });
});