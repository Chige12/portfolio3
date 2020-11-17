export default function(context) {
  // go tell the store to update the page
  setTimeout(() => {
    context.store.commit('styles/updatePage', context.route.name)
  }, 30)
}
