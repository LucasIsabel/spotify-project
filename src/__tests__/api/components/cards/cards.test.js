import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Cards from '../../../../components/cards';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('App Component', () => {
  it('validate quantity of available routes', () => {
    const wrapper = shallow(<Cards/>);
    expect(wrapper).toBeTruthy()
    console.log(wrapper.debug());
  })
})