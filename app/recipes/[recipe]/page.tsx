import React from "react"
import Image from "next/image"

async function getRecipeDetails(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECIPE}${id}/information${process.env.NEXT_PUBLIC_KEY}`
  )
  const data = await response.json()
  return data
}

async function getIngredients(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECIPE}${id}/ingredientWidget.json${process.env.NEXT_PUBLIC_KEY}`
  )
  const data = await response.json()
  return data
}

export default async function RecipePage({ params }: any) {
  const ingredients = await getIngredients(params.recipe)
  const details = await getRecipeDetails(params.recipe)
  console.log(details)
  return (
    <div>
      <h1>{details.title}</h1>
      <Image alt={details.title} width={100} height={100} src={details.image} />
      {ingredients.ingredients.map((ingredient: any) => {
        return (
          <div>
            <h3>{ingredient.name}</h3>
            <p>
              {ingredient.amount.metric.value} {ingredient.amount.metric.unit}
            </p>
          </div>
        )
      })}
    </div>
  )
}
