import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../../src/App';
import {Route} from 'react-router-dom';
import SearchBar from '../../src/components/search';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('App Component', () => {
  it('validate quantity of available routes', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toBeTruthy()
    expect(wrapper.find(Route)).toHaveLength(5)
  })

  it('return true case find element inside wraped component', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper).toBeTruthy()
    expect(wrapper.contains(<SearchBar/>)).toBeTruthy()
  })

})