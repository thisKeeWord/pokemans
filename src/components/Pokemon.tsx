import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Pokemon: FunctionComponent = () => {
  // eslint-disable-next-line semi
  const [description, setDescription] = useState<Record<any, any>>({})
  const [error, setError] = useState<string>('')
  const params = useParams() as Record<any, any>

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        setDescription(results.data)
      } catch (err) {
        setError(err.message)
      }
    }

    getPokemon()
  }, [])

  return (
    <div>
      <div className="onTop">
        <h2>
          Name:
          {' '}
          {params.name.charAt(0).toUpperCase() + params.name.slice(1)}
        </h2>
        <Link to="/">
          <div className="goBack" />
        </Link>
      </div>
      <h3>
        Sprite:
        {' '}
        <img src={description.sprites.front_default} alt={description.sprites.front_default} />
      </h3>
      <h5>
        {Object.keys(description).map((key, index) => {
          // eslint-disable-next-line max-len
          if (!!description[key] && (['forms', 'abilities', 'stats', 'weight', 'moves', 'height', 'id', 'order', 'base_experience', 'types', 'sprites'].includes(key))) {
            if (Array.isArray(description[key])) {
              return (
                <div className="descriptor" key={index}>
                  <span className="key" id="information">{key.replace(/-/g, ' ')}</span>
                  <div className="key">
                    {description[key].map((elem, idx) => {
                      if (elem.move) {
                        if (idx === description[key].length - 1) {
                          return <span className="key">{elem.move.name.replace(/-/g, ' ')}</span>
                        }

                        return (
                          <span className="key">
                            {elem.move.name.replace(/-/g, ' ')}
                            ,&nbsp;&nbsp;
                          </span>
                        )
                      }
                      if (elem.name) {
                        if (idx === description[key].length - 1) {
                          return <span className="key">{elem.name}</span>
                        }

                        return (
                          <span className="key">
                            {elem.name}
                            ,&nbsp;&nbsp;
                          </span>
                        )
                      }
                      if (elem.ability) {
                        if (idx === description[key].length - 1) {
                          return <span className="key">{elem.ability.name}</span>
                        }

                        return (
                          <span className="key">
                            {elem.ability.name}
                            ,&nbsp;&nbsp;
                          </span>
                        )
                      }
                      if (elem.stat) {
                        if (idx === description[key].length - 1) {
                          return (
                            <span className="key">
                              {elem.stat.name}
                              {' '}
                              :
                              {' '}
                              {elem.base_stat}
                            </span>
                          )
                        }

                        return (
                          <span className="key">
                            {elem.stat.name}
                            {' '}
                            :
                            {' '}
                            {elem.base_stat}
                            <br />
                          </span>
                        )
                      }
                      if (elem.type) {
                        if (idx === description[key].length - 1) {
                          return <span className="key">{elem.type.name.replace(/-/g, ' ')}</span>
                        }

                        return (
                          <span className="key">
                            {elem.type.name.replace(/-/g, ' ')}
                            ,&nbsp;&nbsp;
                          </span>
                        )
                      }

                      return null
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div className="descriptor" key={index}>
                <span className="key" id="information">{key.replace(/_/g, ' ')}</span>
                <div className="key">{description[key].toString()}</div>
              </div>
            );
          }

          return null
        })}
      </h5>
    </div>
  );
};

export default Pokemon;
