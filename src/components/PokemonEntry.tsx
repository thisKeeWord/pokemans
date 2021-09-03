import React, { FunctionComponent } from 'react'

interface PokemonEntryProps {
  pokemonEntry: Record<any, any>
}

const PokemonEntry: FunctionComponent<PokemonEntryProps> = ({ pokemonEntry }: PokemonEntryProps) => {
  if (!pokemonEntry.name) {
    return <p>No Pokémon selected.</p>
  }

  return (
    <div>
      <div className="onTop">
        <h2>
          Name:
          {' '}
          {pokemonEntry.name?.charAt(0).toUpperCase() + pokemonEntry.name?.slice(1)}
        </h2>
      </div>
      <h3>
        Sprite:
        {' '}
        <img src={pokemonEntry.sprites?.front_default} alt={pokemonEntry.sprites?.front_default} />
      </h3>
      <div className="pokemon-content">
        {Object.keys(pokemonEntry).map((key, index) => {
        // eslint-disable-next-line max-len
          if (!!pokemonEntry[key] && (['forms', 'abilities', 'stats', 'weight', 'moves', 'height', 'id', 'order', 'base_experience', 'types'].includes(key))) {
            if (Array.isArray(pokemonEntry[key])) {
              return (
                <div className="descriptor" key={index}>
                  <span className="key" id="information" key={key + index}>{key.replace(/-/g, ' ')}</span>
                  <div className="key">
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
                  </div>
                </div>
              )
            }

            return (
              <div className="descriptor" key={index}>
                <span className="key" id="information">{key.replace(/_/g, ' ')}</span>
                <div className="key">{pokemonEntry[key].toString()}</div>
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

export default PokemonEntry
