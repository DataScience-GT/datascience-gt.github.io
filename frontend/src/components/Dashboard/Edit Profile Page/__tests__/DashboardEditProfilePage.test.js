import React from 'react';
import { shallow } from 'enzyme';
import DashboardEditProfilePage from '../DashboardEditProfilePage';

describe('Test HomePage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<DashboardEditProfilePage />);
    });
});
