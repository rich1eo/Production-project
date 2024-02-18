import userEvent from '@testing-library/user-event';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import componentRender from '@/shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';
import { screen } from '@testing-library/react';
import { $api } from '@/shared/api/api';

const profile: Profile = {
  id: '1',
  firstName: 'admin',
  secondName: 'admin',
  age: 465,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Moscow',
  username: 'admin123',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin123',
      },
    },
  },
  asyncReducers: { profile: profileReducer },
};

describe('features/EditableProfileCard', () => {
  test('should change read mode to edit mode', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );

    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelBtn')
    ).toBeInTheDocument();
  });

  test('should return to initial state when cancel', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.secondName'));

    await userEvent.type(
      screen.getByTestId('ProfileCard.firstName'),
      'test-field'
    );
    await userEvent.type(
      screen.getByTestId('ProfileCard.secondName'),
      'test-field'
    );

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue(
      'test-field'
    );
    expect(screen.getByTestId('ProfileCard.secondName')).toHaveValue(
      'test-field'
    );

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelBtn')
    );

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.secondName')).toHaveValue('admin');
  });

  test('should throw error on empty field', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveBtn')
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph')
    ).toBeInTheDocument();
  });

  test('should throw server PUT request on save if profile is ok', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'Alan');
    await userEvent.type(screen.getByTestId('ProfileCard.secondName'), 'Wake');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveBtn')
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
