import React from 'react'
import PropTypes from 'prop-types'
import { GoIssueOpened } from 'react-icons/go'

import IssueLink from './IssueLink'
import RepoLink from './RepoLink'
import Wrapper from './Wrapper'
import ListItem from '../list-item'

export function RepoListItem(props) {
  const { item } = props
  let namePrefix = ''

  // If the repository is owned by a different person than we got the data for
  // it's a fork and we should show the name of the owner
  if (item.owner.login !== props.currentUser) {
    namePrefix = `${item.owner.login}/`
  }

  // Put together the content of the repository
  const content = (
    <Wrapper>
      <RepoLink href={item.html_url} target="_blank">
        {namePrefix + item.name}
      </RepoLink>
      <IssueLink href={`${item.html_url}/issues`} target="_blank">
        <GoIssueOpened />
        {item.open_issues_count}
      </IssueLink>
    </Wrapper>
  )

  return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
}

RepoListItem.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.string
}

export default RepoListItem
