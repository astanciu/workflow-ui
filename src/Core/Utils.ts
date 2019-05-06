import moment from 'moment';

export const getTimeTouched = ({ created_at, created_by, updated_at, updated_by }) => {
  const timeField = updated_at ? updated_at : created_at;
  const user = updated_at ? updated_by : created_by;
  const verb = updated_at ? 'Updated' : 'Created';

  const ago = moment
    .utc(timeField)
    .local()
    .fromNow();

  return { ago, user, verb };
};
