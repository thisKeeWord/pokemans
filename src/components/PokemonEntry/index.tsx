import React, { FunctionComponent } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const categories = ['forms', 'abilities', 'stats', 'weight', 'moves', 'height', 'id', 'base_experience', 'types']
interface PokemonEntryProps {
  pokemonEntry: Record<any, any>
  pokemonEvolutionEntry: Record<any, any>
}

const PokemonEntry: FunctionComponent<PokemonEntryProps> = ({ pokemonEntry, pokemonEvolutionEntry }: PokemonEntryProps) => {
  if (!pokemonEntry.name) {
    return (
      <div>
        <p>No Pokémon selected.</p>
        <span>Click on the menu to begin the search.</span>
      </div>
    )
  }

  return (
    <div data-testid="pokemon-information" key={pokemonEntry.name}>
      <div className="onTop pokemon-content">
        <h2 className="pokemon-name-image">
          <img src={pokemonEntry.sprites?.front_default} alt={pokemonEntry.sprites?.front_default} />
          {pokemonEntry.name}
        </h2>
      </div>
      <div className="pokemon-content" key={pokemonEntry.name}>
        <Table className="table" key={pokemonEntry.name}>
          <TableBody key={pokemonEntry.name}>
            <TableRow className="descriptor first-row" key={pokemonEntry.name}>
              <TableCell className="key" id="information">Part Of Evolutionary Chain</TableCell>
              <TableCell className="key">{pokemonEvolutionEntry.chain?.evolves_to.length > 0 ? 'Yes' : 'No' }</TableCell>
            </TableRow>
            {Object.keys(pokemonEntry).map((key, index) => {
            // eslint-disable-next-line max-len
              if (!!pokemonEntry[key] && (categories.includes(key))) {
                if (Array.isArray(pokemonEntry[key])) {
                  return (
                    <TableRow className="descriptor" key={key + index}>
                      <TableCell className="key" id="information" key={key + index}>
                        {key.replace(/-/g, ' ')}
                      </TableCell>
                      <TableCell className="key">
                        {pokemonEntry[key].map((elem, idx) => {
                          if (elem.move) {
                            if (idx === pokemonEntry[key].length - 1) {
                              return <span className="key" key={elem + idx}>{elem.move.name.replace(/-/g, ' ')}</span>
                            }

                            return (
                              <span className="trait" key={elem + idx}>
                                {elem.move.name.replace(/-/g, ' ')}
                                ,
                                {' '}
                              </span>
                            )
                          }

                          if (elem.name) {
                            if (idx === pokemonEntry[key].length - 1) {
                              return <span className="key" key={elem + idx}>{elem.name}</span>
                            }

                            return (
                              <span className="trait" key={elem + idx}>
                                {elem.name}
                                ,
                                {' '}
                              </span>
                            )
                          }

                          if (elem.ability) {
                            if (idx === pokemonEntry[key].length - 1) {
                              return <span className="key" key={elem + idx}>{elem.ability.name}</span>
                            }

                            return (
                              <span className="trait" key={elem + idx}>
                                {elem.ability.name}
                                ,
                                {' '}
                              </span>
                            )
                          }

                          if (elem.stat) {
                            if (idx === pokemonEntry[key].length - 1) {
                              return (
                                <span className="trait" key={elem + idx}>
                                  {elem.stat.name}
                                  :
                                  {' '}
                                  {elem.base_stat}
                                </span>
                              )
                            }

                            return (
                              <span className="trait" key={elem + idx}>
                                {elem.stat.name}
                                :
                                {' '}
                                {elem.base_stat}
                                <br />
                              </span>
                            )
                          }

                          if (elem.type) {
                            if (idx === pokemonEntry[key].length - 1) {
                              return <span className="trait" key={elem + idx}>{elem.type.name.replace(/-/g, ' ')}</span>
                            }

                            return (
                              <span className="trait" key={elem + idx}>
                                {elem.type.name.replace(/-/g, ' ')}
                                ,
                                {' '}
                              </span>
                            )
                          }

                          return null
                        })}
                      </TableCell>
                    </TableRow>
                  )
                }

                return (
                  <TableRow className="descriptor" key={`${key}unique`}>
                    <TableCell className="key" id="information">{key.replace(/_/g, ' ')}</TableCell>
                    <TableCell className="key">{pokemonEntry[key].toString()}</TableCell>
                  </TableRow>
                )
              }

              return null
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PokemonEntry
