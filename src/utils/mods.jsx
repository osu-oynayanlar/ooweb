const modsLong = {
    1: "No Fail",
    2: "Easy",
    4: "No Video",
    8: "Hidden",
    16: "Hard Rock",
    32: "Sudden Death",
    64: "Double Time",
    128: "Relax",
    256: "Half Time",
    512: "Nightcore",
    1024: "Flashlight",
    2048: "Autoplay",
    4096: "Spun Out",
    8192: "Autopilot",
    16384: "Perfect",
    32768: "4 Keys",
    65536: "5 Keys",
    131072: "6 Keys",
    262144: "7 Keys",
    524288: "8 Keys",
    1015808: "Key Mod",
    1048576: "Fade In",
    2097152: "Random",
    4194304: "Last Mod",
};

const modsShort = {
    1: "NF",
    2: "EZ",
    4: "NV",
    8: "HD",
    16: "HR",
    32: "SD",
    64: "DT",
    128: "RX",
    256: "HT",
    512: "NC",
    1024: "FL",
    2048: "AT",
    4096: "SO",
    8192: "AP",
    16384: "PF",
    32768: "4K",
    65536: "5K",
    131072: "6K",
    262144: "7K",
    524288: "8K",
    1015808: "KM",
    1048576: "FI",
    2097152: "RN",
    4194304: "LM",
};

const getModString = (inputInteger) => {
    let modsCombination = "";

    Object.keys(modsShort).forEach((key) => {
        if ((inputInteger & parseInt(key)) !== 0) {
            modsCombination += modsShort[key];
        }
    });

    return modsCombination;
};

export { modsLong, modsShort, getModString };
