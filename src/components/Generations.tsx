import React, {
  FunctionComponent, ReactElement, useState,
} from 'react'
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
  // eslint-disable-next-line no-unused-vars
  getPokemonData: (name: string) => Promise<void>
}

const Generations: FunctionComponent<GenerationsProps> = ({ genList, getPokemonData }: GenerationsProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [generation, setGeneration] = useState<number | string>(0)
  const history = useHistory()

  // switch between generation list and generation's pokemon list
  const list = (): ReactElement => {
    const arr = generation ? genList[generation as number - 1] : genList
    const clickListener = async (gen: number | string) => {
      if (!generation) {
        return setGeneration(gen as number + 1)
      }
      history.push(`/pokemon/${gen}`, { updated: true })
      setOpenDrawer(false)
      await getPokemonData(gen as string)
    }
    return (
      <div role="presentation" onKeyDown={() => setOpenDrawer(false)}>
        <List>
          {arr?.map((el: Record<any, any>, index: number) => (
            <ListItem button key={index} onClick={() => clickListener(generation ? el.name : index)}>
              <ListItemText primary={generation ? el.name : `Gen ${index + 1}`} className="drawer-item" />
              {!generation && <ChevronRightIcon />}
            </ListItem>
          ))}
        </List>
      </div>
    )
  }

  return (
    <>
      <Button onClick={() => setOpenDrawer(true)}>View By Generation</Button>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {generation > 0 && (
          <ListItem button onClick={() => setGeneration(0)}>
            <ListItemText primary="Back to main menu" />
            <ChevronLeftIcon />
          </ListItem>
        )}
        {list()}
      </Drawer>
    </>
  )
}

export default Generations
