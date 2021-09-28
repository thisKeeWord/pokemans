import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Divider from '@material-ui/core/Divider/Divider'
import IconButton from '@material-ui/core/IconButton/IconButton'
import List from '@material-ui/core/List/List'
import Button from '@material-ui/core/Button/Button'
import { Drawer, ListItem, ListItemText } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

interface GenerationsProps {
  genList: any[]
  state: Record<any, any>
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))

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
      <Button onClick={() => setOpenDrawer(true)} variant="contained">View Pokemon</Button>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpenDrawer(false)}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {generation ? (
          <>
            <ListItem button onClick={() => setGeneration('')}>
              <ListItemText primary="Back to region list" />
              <ChevronRightIcon />
            </ListItem>
            <div role="presentation" onKeyDown={() => setOpenDrawer(false)}>
              <List className="drawer-list">
                {pokemonList?.map((pokemon: Record<any, any>, index: number) => (
                  <ListItem button key={index} onClick={() => handlePokemonSelection(pokemon)}>
                    <ChevronLeftIcon />
                    <ListItemText key={index} primary={pokemon.name} className="drawer-item" />
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        ) : (
          <div role="presentation" onKeyDown={() => setOpenDrawer(false)}>
            <List className="drawer-list">
              {genList?.map((gen: Record<any, any>, index: number) => (
                <ListItem button key={index} onClick={() => selectRegion(gen)}>
                  <ChevronLeftIcon />
                  <ListItemText key={index} primary={gen.region} className="drawer-item" />
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
