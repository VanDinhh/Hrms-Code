function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function stringToSlug(str) {
  // remove accents
  var from =
      'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to =
      'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '');

  return str;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return day + '/' + month + '/' + year;
}

const getEmailCompany = (firstName, lastName) => {
  return `${lastName}.${firstName}@company.com`;
};

export const generate = (employee) => {
  const contractID = makeid(6);
  const id = makeid(6);
  const signDate = formatDate(new Date());
  const contractTerm = formatDate(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  );
  const firstName = stringToSlug(employee.firstName);
  const lastName = stringToSlug(employee.lastName);
  const emailCompany = getEmailCompany(firstName, lastName);
  return {
    ...employee,
    contractID,
    id,
    signDate,
    contractTerm,
    emailCompany,
  };
};
