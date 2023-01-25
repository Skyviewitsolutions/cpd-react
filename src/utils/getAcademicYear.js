 export const getAcedemicYears = () => {
    let currentYear = new Date().getFullYear();
    let options = [];
    for (let i = currentYear; i >= 1950; i--) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  };
