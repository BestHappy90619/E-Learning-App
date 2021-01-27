import React, { useCallback, useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import SearchBox from '../../components/SearchBox';
import Content from '../../components/Content';
import CourseCard from '../../components/CourseCard';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import { Container, Header, TopHeader, ContentHeader, Title, CoursesText, CoursesContainer } from './styles';

interface Course {
  id: number;
  title: string;
  cover: string; 

  lessons: any;
}

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function loadCourses(): Promise<void> {
      const { data } = await api.get('/courses');

      setCourses(data);
    }

    loadCourses();
  }, []);

  return (
    <Container>      
      <Header>
        <TopHeader>
          <Image source={logoImg} />
          <Icon name="power" size={24} color="#FF6680" />
        </TopHeader>
        <SearchBox />
      </Header>
      <Content>
        <ContentHeader>
          <Title>Categorias</Title>
          <CoursesText>43 cursos</CoursesText>
        </ContentHeader>
        <CoursesContainer>
          {courses.map(c => (
            <CourseCard key={c.id} title={c.title} lessons={c.lessons.length} cover={c.cover} />
          ))}
        </CoursesContainer>
      </Content>
    </Container>
  )
}

export default Dashboard;