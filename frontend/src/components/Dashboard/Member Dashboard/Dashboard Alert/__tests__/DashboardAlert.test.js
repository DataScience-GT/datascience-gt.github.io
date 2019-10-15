import React from 'react';
import { shallow } from 'enzyme';
import DashboardAlert from '../DashboardAlert';

// TODO: Specify number of instances to be visible for the Dashboard Home Page.
describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<DashboardAlert />);
    });
});
