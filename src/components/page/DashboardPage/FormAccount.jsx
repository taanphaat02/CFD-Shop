import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAddress from "../../../hook/useAddress";
import { Controller, useForm } from "react-hook-form";
import { authService } from "../../../services/authService";
import { Select, message } from "antd";
import { handleGetProfile } from "../../../store/reducer/authReducer";
import dayjs from "dayjs";
import { Input } from "../../Input";
import { MESSAGE, REGEX } from "../../../constants/validate";
import { removeAccents } from "../../../utils/format";

const FormAccount = () => {
  const { profile } = useSelector((state) => state.auth);
  const [initialData, setInitialData] = useState({});

  const dispatch = useDispatch();
  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
  } = useAddress();

  const {
    firstName,
    phone,
    email,
    province,
    district,
    ward,
    street,
    birthday,
  } = profile || {};

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    control,
  } = useForm();

  const _onProvinceChange = (changedId) => {
    handleProvinceChange?.(changedId);
    reset({
      ...getValues(),
      province: changedId,
      district: undefined,
      ward: undefined,
    });
  };

  const _onDistrictChange = (changedId) => {
    handleDistrictChange?.(changedId);
    reset({
      ...getValues(),
      district: changedId,
      ward: undefined,
    });
  };

  const _onWardChange = (changedId) => {
    handleWardChange?.(changedId);
    reset({
      ...getValues(),
      ward: changedId,
    });
  };

  const onSubmit = async (data) => {
    const isChanged = Object.keys(data).some(
      (key) => data[key] !== initialData[key]
    );

    if (!isChanged) {
      message.info("No changes detected. No update necessary.");
      return;
    }
    const payload = {
      ...data,
      lastName: profile?.lastName,
    };

    try {
      const res = await authService.updateProfile(payload);
      if (res?.data?.data) {
        message.success("Update profile success");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Something wrong ");
    }
  };

  useEffect(() => {
    if (profile) {
      const formattedProfile = {
        firstName: profile.firstName,
        email: profile.email,
        phone: profile.phone,
        province: profile.province,
        district: profile.district,
        ward: profile.ward,
        street: profile.street,
        birthday: profile.birthday
          ? dayjs(profile.birthday).format("YYYY-MM-DD")
          : "",
      };
      reset(formattedProfile);
      setInitialData(formattedProfile);
    }
  }, [profile, reset]);

  useEffect(() => {
    if (!profile) return;
    reset?.({
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
      birthday: profile?.birthday
        ? dayjs(profile?.birthday).format("YYYY/MM/DD").replaceAll("/", "-")
        : "",
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  return (
    <div className="tab-pane fade show active">
      <form onSubmit={handleSubmit(onSubmit)} className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Full Name"
              {...register("firstName", {
                required: MESSAGE.required,
              })}
              error={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Email address"
              {...register("email", {
                required: MESSAGE.required,
                pattern: {
                  value: REGEX.email,
                  message: MESSAGE.email,
                },
              })}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Phone number"
              {...register("phone", {
                required: MESSAGE.phone,
                pattern: {
                  value: REGEX.phone,
                  message: MESSAGE.phone,
                },
              })}
              error={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="date"
              required
              label="Birthday"
              {...register("birthday", {
                required: MESSAGE.phone,
              })}
              error={errors?.birthday?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Plase select Province/City"
                      options={provinces}
                      value={provinceId}
                      optionFilterProp="children"
                      onChange={_onProvinceChange}
                      filterOption={(input, option) => {
                        return removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()));
                      }}
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Plase select District/Town"
                      options={districts}
                      value={districtId}
                      optionFilterProp="children"
                      onChange={_onDistrictChange}
                      filterOption={(input, option) => {
                        return removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()));
                      }}
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.district?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Plase select Ward"
                      options={wards}
                      value={wardId}
                      optionFilterProp="children"
                      onChange={_onWardChange}
                      filterOption={(input, option) => {
                        return removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()));
                      }}
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.ward?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
        </div>
        <Input
          type="text"
          required
          {...register("street", {
            required: MESSAGE.required,
          })}
          label="Street address"
          error={errors?.street?.message || ""}
        />

        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default FormAccount;
