const today = new Date();
const formatDate = (date) => date.toISOString().split('T')[0];

const getDateDaysAgo = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() - days);
  return d;
};

const getDateMonthsAgo = (months) => {
  const d = new Date(today);
  d.setMonth(d.getMonth() - months);
  return d;
};

const getDateYearsAgo = (years) => {
  const d = new Date(today);
  d.setFullYear(d.getFullYear() - years);
  return d;
};

export const ANALYTICS_PERIODS = {
    Today: {
      period: `${formatDate(today)}/${formatDate(today)}`,
      index: 0,
    },
    Week: {
      period: `${formatDate(getDateDaysAgo(7))}/${formatDate(today)}`,
      index: 1,
    },
    '2 Weeks': {
      period: `${formatDate(getDateDaysAgo(14))}/${formatDate(today)}`,
      index: 2,
    },
    Month: {
      period: `${formatDate(getDateMonthsAgo(1))}/${formatDate(today)}`,
      index: 3,
    },
    Year: {
      period: `${formatDate(getDateYearsAgo(1))}/${formatDate(today)}`,
      index: 4,
    },
  };
  
