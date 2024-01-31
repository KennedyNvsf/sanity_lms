export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR"
    }).format(price)
  }