import React from 'react';
import { shallow } from 'enzyme';
import App from '../';

describe('Test App Component with shallow rendering', () => {
    it('Crash-free rendering', () => {
        shallow(<App />);
    });
});