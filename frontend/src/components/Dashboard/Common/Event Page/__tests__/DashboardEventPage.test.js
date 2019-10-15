import React from 'react';
import { shallow } from 'enzyme';
import DashboardEventPage from '../DashboardEventPage';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<DashboardEventPage />);
    });
});
