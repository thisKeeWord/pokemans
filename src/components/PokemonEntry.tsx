import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import { Table, TableCell } from '@mui/material'

const categories = ['forms', 'abilities', 'stats', 'weight', 'moves', 'height', 'id', 'order', 'base_experience', 'types']
interface PokemonEntryProps {
  pokemonEntry: Record<any, any>
}

const PokemonEntry: FunctionComponent<PokemonEntryProps> = ({ pokemonEntry }: PokemonEntryProps) => {
  if (!pokemonEntry.name) {
    return (
      <div>
        <p>No Pokémon selected.</p>
        <span>Click on the menu to begin the search.</span>
      </div>
    )
  }

  return (
    <div>
      <div className="onTop">
        <h2>
          Name:
          {' '}
          {pokemonEntry.name}
        </h2>
      </div>
      <h3>
        Sprite:
        {' '}
        <img src={pokemonEntry.sprites?.front_default} alt={pokemonEntry.sprites?.front_default} />
      </h3>
      <div className="pokemon-content">
        <Table className="table">
          {Object.keys(pokemonEntry).map((key, index) => {
            // eslint-disable-next-line max-len
            if (!!pokemonEntry[key] && (categories.includes(key))) {
              if (Array.isArray(pokemonEntry[key])) {
                return (
                  <div className={cx('descriptor', { 'first-row': index === 0 })} key={index}>
                    <TableCell className="key" id="information" key={key + index}>{key.replace(/-/g, ' ')}</TableCell>
                    <TableCell className="key">
                      {pokemonEntry[key].map((elem, idx) => {
                        if (elem.move) {
                          if (idx === pokemonEntry[key].length - 1) {
                            return <span className="key">{elem.move.name.replace(/-/g, ' ')}</span>
                          }

                          return (
                            <span className="trait">
                              {elem.move.name.replace(/-/g, ' ')}
                              ,
                              {' '}
                            </span>
                          )
                        }
                        if (elem.name) {
                          if (idx === pokemonEntry[key].length - 1) {
                            return <span className="key">{elem.name}</span>
                          }

                          return (
                            <span className="trait">
                              {elem.name}
                              ,
                              {' '}
                            </span>
                          )
                        }
                        if (elem.ability) {
                          if (idx === pokemonEntry[key].length - 1) {
                            return <span className="key">{elem.ability.name}</span>
                          }

                          return (
                            <span className="trait">
                              {elem.ability.name}
                              ,
                              {' '}
                            </span>
                          )
                        }
                        if (elem.stat) {
                          if (idx === pokemonEntry[key].length - 1) {
                            return (
                              <span className="trait">
                                {elem.stat.name}
                                :
                                {' '}
                                {elem.base_stat}
                              </span>
                            )
                          }

                          return (
                            <span className="trait">
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
                            return <span className="trait">{elem.type.name.replace(/-/g, ' ')}</span>
                          }

                          return (
                            <span className="trait">
                              {elem.type.name.replace(/-/g, ' ')}
                              ,
                              {' '}
                            </span>
                          )
                        }

                        return null
                      })}
                    </TableCell>
                  </div>
                )
              }

              return (
                <div className={cx('descriptor', { 'first-row': index === 0 })} key={index}>
                  <TableCell className="key" id="information">{key.replace(/_/g, ' ')}</TableCell>
                  <TableCell className="key">{pokemonEntry[key].toString()}</TableCell>
                </div>
              )
            }

            return null
          })}
        </Table>
      </div>
    </div>
  )
}

export default PokemonEntry
