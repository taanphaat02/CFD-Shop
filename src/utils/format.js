import moment from "moment";
import { DATE_FORMAT } from "../constants/format";

export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};

export const formatDate = (date, format = DATE_FORMAT) => {
  if (!!!date) return "";
  return moment(date).format(format);
};

export const transformNumberToPecent = (number) => {
  if (!number) return 0;
  return number * 100;
};

export const removeAccents = (str) => {
  var AccentsMap = [
    "AÁÀÃẠÂẤẦẪẬĂẮẰẴẶ",
    "àáạảãâầấậẩẫăằắặẳẵ",
    "EÉÈẼẸÊẾỀỄỆ",
    "èéẹẻẽêềếệểễ",
    "èéẹẻẽêềếệểễ",
    "ìíịỉĩ",
    "OÓÒÕỌÔỐỒỖỘƠỚỜỠỢ",
    "òóọỏõôồốộổỗơờớợởỡ",
    "UÚÙŨỤƯỨỪỮỰ",
    "ùúụủũưừứựửữ",
    "YÝỲỸỴ",
    "ỳýỵỷỹ",
    "DĐ",
    "dđ",
  ];

  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

// export const getImageURL = (data) => `https://cfdshop.hn.ss.bfcp `
