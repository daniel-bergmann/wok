import React from "react"
import Image from "next/image"
import { MdOutlineRamenDining } from "react-icons/md"
import { RxLapTimer } from "react-icons/rx"

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
  return (
    <section className="recipe-container">
      <div className="row head">
        <h1>{details.title}</h1>
        <Image
          alt={details.title}
          width={200}
          height={150}
          src={details.image}
        />
      </div>
      <div className="row time">
        <div>
          <RxLapTimer />
          <p>{details.readyInMinutes} min</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          accusantium repellat hic.
        </p>
      </div>

      <div className="row ingredients">
        <div className="heading">
          <h3>ingredients</h3>
          <MdOutlineRamenDining />
        </div>
        <div className="ingredient-list">
          {ingredients.ingredients.map((ingredient: any) => {
            return (
              <>
                <p>
                  {ingredient.amount.metric.value}
                  {ingredient.amount.metric.unit} ◌ {ingredient.name}
                </p>
              </>
            )
          })}
        </div>
      </div>
      <div
        className="row"
        dangerouslySetInnerHTML={{ __html: details.instructions }}
      />
    </section>
  )
}
