function validateImage(state) {
  if (
    state.imageName
      .substring(state.imageName.lastIndexOf(".") + 1, state.imageName.length)
      .toLowerCase() !== "jpg" &&
    state.imageName
      .substring(state.imageName.lastIndexOf(".") + 1, state.imageName.length)
      .toLowerCase() !== "jpeg" &&
    state.imageName
      .substring(state.imageName.lastIndexOf(".") + 1, state.imageName.length)
      .toLowerCase() !== "png"
  ) {
    return false;
  }
  return true;
}
module.exports = { validateImage: validateImage };
