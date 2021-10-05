// import React from 'react'
// import '@testing-library/jest-dom'
// import { render } from '@testing-library/react'
// import Generations from '.'

// const genList = [
//   {
//     region: 'Kanto',
//     pokemonList: [
//       {
//         name: 'bulbasaur',
//         url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
//       },
//     ],
//   },
// ]

// describe('Generations', () => {
//   let renderer: ReturnType<typeof render>
//   let getByTestId: Function
//   let getByText: Function

//   beforeEach(() => {
//     renderer = render(<Generations genList />)
//     getByTestId = renderer.getByTestId
//     getByText = renderer.getByText
//   })

//   afterEach(() => {
//     renderer.unmount()
//   })

//   it('displays a link to the home page', () => {
//     expect(getByTestId('home-link')).toBeInTheDocument()
//     expect(getByText('Escape Rope')).toBeInTheDocument()
//   })

//   it('displays the Generations section', () => {
//     expect(getByTestId('four-oh-four-body')).toBeInTheDocument()
//   })

//   it('displays the pikachu gif', () => {
//     expect(getByTestId('pikachu')).toBeInTheDocument()
//   })
// })

export {}
