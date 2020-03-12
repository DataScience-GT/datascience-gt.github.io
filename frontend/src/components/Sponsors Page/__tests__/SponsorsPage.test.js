import React from 'react';
import { shallow } from 'enzyme';
import SponsorsPage from '..';

describe('Test SponsorsPage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<SponsorsPage />);
    });
});