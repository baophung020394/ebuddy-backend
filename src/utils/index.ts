import _ from "lodash";

interface GetInfoDataParams {
  fields: string[];
  object: object;
}

const getInfoData = ({ fields = [], object = {} }: GetInfoDataParams) => {
  return _.pick(object, fields);
};

export { getInfoData };
