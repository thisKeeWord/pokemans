import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

interface GenerationsProps {
  genList: any[]
  state: Record<any, any>
}

const Generations: FunctionComponent<GenerationsProps> = ({ genList, state }: GenerationsProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [generation, setGeneration] = useState<string>('')
  const [pokemonList, setPokemonList] = useState<any[]>([])
  const history = useHistory()

  const handlePokemonSelection = async (pokemon: Record<any, any>) => {
    history.push(`/pokemon/${pokemon.name}`, { updated: true, generation })
    setOpenDrawer(false)
    setGeneration(generation)
  }

  const selectRegion = (gen: Record<any, any>) => {
    setGeneration(gen.region)
    setPokemonList(gen.pokemonList)
  }

  useEffect(() => {
    if (state?.generation && genList.length) {
      const stateList = genList.find(({ region }) => region === state.generation)
      setGeneration(state.generation)
      setPokemonList(stateList.pokemonList)
    }
  }, [state])

  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>View By Generation</Button>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {generation ? (
          <>
            <ListItem button onClick={() => setGeneration('')}>
              <ChevronLeftIcon />
              <ListItemText primary="Back to region list" />
            </ListItem>
            <div role="presentation" onKeyDown={() => setOpenDrawer(false)}>
              <List>
                {pokemonList?.map((pokemon: Record<any, any>, index: number) => (
                  <ListItem button key={index} onClick={() => handlePokemonSelection(pokemon)}>
                    <ListItemText key={index} primary={pokemon.name} className="drawer-item" />
                    <ChevronRightIcon />
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        ) : (
          <div role="presentation" onKeyDown={() => setOpenDrawer(false)}>
            <List>
              {genList?.map((gen: Record<any, any>, index: number) => (
                <ListItem button key={index} onClick={() => selectRegion(gen)}>
                  <ListItemText key={index} primary={gen.region} className="drawer-item" />
                  <ChevronRightIcon />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Drawer>
    </>
  )
}

export default Generations
