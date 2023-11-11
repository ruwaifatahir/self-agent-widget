import { checkIsNameAvailable, checkIsNameReserved } from "./methods";

export const useValidations = (debouncedName: any) => {
  const basicValidations = {
    required: true,
    minLength: {
      value: 5,
      message: "Please enter a name with at least 5 characters",
    },
    maxLength: {
      value: 40,
      message: "Please enter a shorter name (40 characters or less)",
    },
    pattern: {
      value: /^[a-z0-9_]+$/,
      message:
        "Name can only contain lowercase letters, numbers, and underscores",
    },
  };
  const customValidations = {
    noReservedWord: (value: string) => {
      let reservedWords = ["v_", "self", "seif"];
      let isValid = true;

      for (let i = 0; i < reservedWords.length; i++) {
        if (value.length >= 5 && value.startsWith(reservedWords[i])) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        return "Name should not start with a reserved word.";
      }
    },
    noUnderscoreAtTheStart: (value: string) => {
      const regex = /^[^_].*/;
      return regex.test(value) || "Underscore at the start not allowed";
    },

    noConsecitiveUnderscores: (value: string) => {
      const regex = /^(?!.*__).*/;
      return regex.test(value) || "Consecetive underscores not allowed";
    },
    isReserved: async (value: any) => {
      if (debouncedName !== value)
        return "Our system is checking availability. Please stand by.";
      let availability = await checkIsNameReserved(value);
      if (availability === undefined) return "Invalid input";
      return !availability || "Name Reserved. Please choose another.";
    },

    isAvailable: async (value: any) => {
      if (debouncedName !== value)
        return "Our system is checking availability. Please stand by.";
      let availability = await checkIsNameAvailable(value);
      if (availability === undefined) return "Invalid input";
      return availability || "Name already taken. Please choose another.";
    },
  };

  return {
    ...basicValidations,
    validate: customValidations,
  };
};
